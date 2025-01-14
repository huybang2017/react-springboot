package BackEnd.Entity.NewsEntities;

import BackEnd.Entity.AccountEntity.Account;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "News")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "Banner", nullable = false)
    private String banner;

    @Column(name = "Content", nullable = false)
    private String content;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "CreateTime", nullable = false)
    private LocalDateTime createTime = LocalDateTime.now();;

    @Column(name = "Status", nullable = false)
    private Boolean status = false;

    @Column(name = "PriorityFlag", nullable = false)
    private Boolean priorityFlag = false;

    @Column(name = "AuthorId", nullable = false)
    private Integer authorId;

    @ManyToOne
    @JoinColumn(name = "AuthorId", insertable = false, updatable = false)
    private Account account;

    @OneToMany(mappedBy = "news")
    private List<NewsImage> newsImages;


}
